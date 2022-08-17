export function parseJson(json) {
  try {
    return JSON.parse(json);
  } catch (error) {
    return undefined;
  }
}
//# sourceMappingURL=utils.js.map