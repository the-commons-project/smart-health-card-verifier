import { validate as qrValidate } from './qr';
import { setVerifierInitOption } from "~/models/Config";
export * from './types';
export class SHCVerifier {
  constructor(options) {
    setVerifierInitOption(options.shc);
    console.info("SHCVerifier: initialized");
  }

  canVerify(payloads) {
    if (payloads.length > 0 && payloads[0].length > 4 && payloads[0].startsWith("shc:/")) {
      return Promise.resolve(this);
    }

    return Promise.reject(null);
  }

  validate(payloads) {
    return qrValidate(payloads);
  }

}
//# sourceMappingURL=index.js.map