"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Config = require("~/models/Config");

class R4Observation {
  parse(entry) {
    const verifierOption = (0, _Config.getVerifierInitOption)();

    try {
      var _meta$security$;

      const unknownSystem = null;
      const {
        status,
        code,
        performer,
        meta,
        valueCodeableConcept,
        effectiveDateTime
      } = entry === null || entry === void 0 ? void 0 : entry.resource;
      const systemCoding = code === null || code === void 0 ? void 0 : code.coding[0];
      const securityCode = meta !== null && meta !== void 0 && meta.security ? (meta === null || meta === void 0 ? void 0 : (_meta$security$ = meta.security[0]) === null || _meta$security$ === void 0 ? void 0 : _meta$security$.code) ?? null : null;
      const system = verifierOption.getAcceptedSystemCode(systemCoding.system, systemCoding.code);
      const systemName = system.display ?? unknownSystem;
      const performerName = this.getPerformerLabel(performer);
      const systemKey = (system === null || system === void 0 ? void 0 : system.systemKey) ?? unknownSystem;
      const systemCode = (system === null || system === void 0 ? void 0 : system.code) ?? unknownSystem;
      const systemShortDefault = (system === null || system === void 0 ? void 0 : system.shortDefault) ?? null;
      let codableConseptKey = null;
      let codableConseptLabel = null;
      let codableConseptCode = null;
      let codeableShortDefault = null;

      if (valueCodeableConcept !== null && valueCodeableConcept !== void 0 && valueCodeableConcept.coding[0]) {
        const codableCoding = valueCodeableConcept === null || valueCodeableConcept === void 0 ? void 0 : valueCodeableConcept.coding[0];
        const codableSystem = verifierOption.getAcceptedSystemCode(codableCoding.system, codableCoding.code);
        codableConseptLabel = verifierOption.getSystemCodeLabel(codableSystem.system, codableSystem.code);
        codableConseptKey = codableSystem.systemKey;
        codableConseptCode = codableSystem.code;
        codeableShortDefault = codableSystem.codeableShortDefault ?? null;
      }

      return {
        securityCode,
        status,
        performer: performerName,
        systemName,
        systemKey,
        systemCode,
        systemShortDefault,
        effectiveDateTime,
        codableConseptLabel,
        codableConseptKey,
        codableConseptCode,
        codeableShortDefault
      };
    } catch (e) {
      console.info(e);
    }
  }

  getPerformerLabel(performers) {
    let res = null;

    if (performers) {
      res = performers[0].display ? performers[0].display : null;
    }

    return res;
  }

}

exports.default = R4Observation;
//# sourceMappingURL=R4Observation.js.map