import { StackNavigationProp } from '@react-navigation/stack'

type RootStackParamList = {
  Welcome: undefined
  ScanQR: undefined
  VerificationResult: undefined
  Error: undefined
}

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>

export type Props = {
  navigation: ProfileScreenNavigationProp
  route: any
}
