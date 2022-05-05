"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.publish = void 0;
var fs_1 = require("fs");
var googleapis_1 = require("googleapis");
var getClient = function (keyFile) {
    return googleapis_1.google.auth.getClient({
        keyFile: keyFile,
        scopes: "https://www.googleapis.com/auth/androidpublisher"
    });
};
var getAndroidPublisher = function (client, packageName) {
    return googleapis_1.google.androidpublisher({
        version: "v3",
        auth: client,
        params: {
            packageName: packageName
        }
    });
};
var startEdit = function (androidPublisher, id) {
    return androidPublisher.edits.insert({
        requestBody: {
            id: id,
            expiryTimeSeconds: "600"
        }
    });
};
var upload = function (androidPublisher, editId, packageName, aab) {
    return androidPublisher.edits.bundles.upload({
        editId: editId,
        packageName: packageName,
        media: {
            mimeType: "application/octet-stream",
            body: aab
        }
    });
};
var setTrack = function (androidPublisher, editId, packageName, track, versionCode, status) {
    if (status === void 0) { status = "completed"; }
    return androidPublisher.edits.tracks.update({
        editId: editId,
        track: track,
        packageName: packageName,
        requestBody: {
            track: track,
            releases: [
                {
                    status: status,
                    versionCodes: [versionCode]
                }
            ]
        }
    });
};
var commit = function (androidPublisher, editId, packageName, changesNotSentForReview) {
    return androidPublisher.edits.commit({
        editId: editId,
        packageName: packageName,
        changesNotSentForReview: changesNotSentForReview
    });
};
var getAABStream = function (filePath) { return (0, fs_1.createReadStream)(filePath); };
var getId = function () { return String(new Date().getTime()); };
var publish = function (_a) {
    var keyFile = _a.keyFile, packageName = _a.packageName, aabFile = _a.aabFile, track = _a.track, status = _a.status, _b = _a.changesNotSentForReview, changesNotSentForReview = _b === void 0 ? false : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var client, stream, androidPublisher, id, edit, editId, bundle;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, getClient(keyFile)];
                case 1:
                    client = _c.sent();
                    stream = getAABStream(aabFile);
                    androidPublisher = getAndroidPublisher(client, packageName);
                    id = getId();
                    return [4 /*yield*/, startEdit(androidPublisher, id)];
                case 2:
                    edit = _c.sent();
                    editId = String(edit.data.id);
                    return [4 /*yield*/, upload(androidPublisher, editId, packageName, stream)];
                case 3:
                    bundle = _c.sent();
                    if (bundle.data.versionCode === undefined ||
                        bundle.data.versionCode === null) {
                        throw new Error("Bundle versionCode cannot be undefined or null");
                    }
                    return [4 /*yield*/, setTrack(androidPublisher, editId, packageName, track, String(bundle.data.versionCode), status)];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, commit(androidPublisher, editId, packageName, changesNotSentForReview)];
                case 5:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.publish = publish;
