interface  ObservationValidator {
  /* this checks if observation system could be applied */
  canSupport: (entry: BundleEntry) => boolean 
  validate: ( entry: BundleEntry ) => Promise<boolean>
}

interface ObservationParser {
  parse: ( entry: BundleEntry ) => any
}
