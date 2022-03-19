interface  ObservationValidator {
  /* this checks if observation system could be applied */
  isSystem(entry: BundleEntry): boolean 
  validate( entry: BundleEntry ): boolean
}

