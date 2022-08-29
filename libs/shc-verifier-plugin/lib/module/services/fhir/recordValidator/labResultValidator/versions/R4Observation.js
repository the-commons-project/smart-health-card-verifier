import { getVerifierInitOption } from '../../../../../models/Config';

class R4Observation {
  canSupport(entry) {
    var _entry$resource, _entry$resource$code;

    const isAcceptedResult = getVerifierInitOption().isAcceptedLabResult;
    const coding = ((entry === null || entry === void 0 ? void 0 : (_entry$resource = entry.resource) === null || _entry$resource === void 0 ? void 0 : (_entry$resource$code = _entry$resource.code) === null || _entry$resource$code === void 0 ? void 0 : _entry$resource$code.coding) ?? []).filter(item => {
      return isAcceptedResult(item.system, item.code);
    });
    return coding.length > 0;
  }

  async validate(entry) {
    let res = true;
    const acceptedStatuses = ['final', 'amended', 'corrected'];

    if (this.canSupport(entry)) {
      const {
        status
      } = entry.resource || '';
      const isObservationCompleteStatus = acceptedStatuses.includes(String(status));
      console.log('isObservationCompleteStatus - ' + isObservationCompleteStatus);

      if (!isObservationCompleteStatus) {
        console.log(`Observation.status should be "final, amended, corrected", but it is ${String(status)}`);
        res = false;
      }
    } else {
      var _entry$resource2, _entry$resource2$code;

      res = false;
      console.log(`Observation.system ${String(entry === null || entry === void 0 ? void 0 : (_entry$resource2 = entry.resource) === null || _entry$resource2 === void 0 ? void 0 : (_entry$resource2$code = _entry$resource2.code) === null || _entry$resource2$code === void 0 ? void 0 : _entry$resource2$code.coding)} should be supported`);
    }

    return Promise.resolve(res);
  }

}

export default R4Observation;
//# sourceMappingURL=R4Observation.js.map