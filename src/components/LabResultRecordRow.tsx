import React from 'react'
import { Text } from 'react-native'
import { RecordEntry } from '../types'
import { useTranslation } from '../services/i18n/i18nUtils'

export default ( { recordEntries } : RecordEntry[] | any) => {
  const { t } = useTranslation()
  return <Text>This is lab result</Text>
}