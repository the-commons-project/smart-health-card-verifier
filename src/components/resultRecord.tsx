import React, { useState } from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'

type ResultRecordVariables = {
  content?: any
}

const images = {
  'commonTrustNetworkLogo': require('../../assets/img/verificationresult/common-trust-network-logo.png'),
  'smartLogo': require('../../assets/img/verificationresult/smart-logo.png'),
  'eyes': require('../../assets/img/verificationresult/eyes.png'),
  'warningCross': require('../../assets/img/verificationresult/warning-cross.png'),
}

const ResultRecord = ({ content } : ResultRecordVariables) => {
  return (
    <View style={styles.recordContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>COVID-19 Vaccination Record</Text>
        <Image source={images.smartLogo} />
      </View>
      <View style={styles.titleContainer}>
        <View style={styles.particularContainer}>
          <View>
            <Text style={styles.fieldTitle}>Name</Text>
            <Text style={styles.fieldValue}>PersonA</Text>
          </View>
          <View style={styles.rowSpacerMedium}>
            <Text style={styles.fieldTitle}>Date of Birth</Text>
            <View style={styles.titleContainer}>
              <Text style={styles.fieldValue}>**/**/****</Text>
              <Image style={styles.rowSpacerMedium} source={images.eyes} />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.doseDividerContainer}>
        <Text style={styles.verifiedByText}>Dose 1</Text>
        <View style={styles.doseDivider} />
      </View>
      <View>
        <Text style={styles.fieldTitle}>Date</Text>
        <Text style={styles.fieldValue}>05/03/2021</Text>
        <Text style={styles.fieldTitle}>Vaccine Product, Lot #348712</Text>
        <Text style={styles.fieldTitle}>Walmart, 13770 W BELL RD, AZ,85374-3865</Text>
      </View>
      <View style={styles.doseDividerContainer}>
        <Text style={styles.verifiedByText}>Dose 2</Text>
        <View style={styles.doseDivider} />
      </View>
      <View>
        <Text style={styles.fieldTitle}>Date</Text>
        <Text style={styles.fieldValue}>06/03/2021</Text>
        <Text style={styles.fieldTitle}>Vaccine Product, Lot #348712</Text>
        <Text style={styles.fieldTitle}>Walmart, 13770 W BELL RD, AZ,85374-3865</Text>
      </View>
      <View style={styles.divider} />
      <View>
        <Text style={styles.fieldTitle}>Issuer</Text>
        <Text style={styles.fieldValue}>State of California</Text>
        <View style={styles.verifierContainer}>
          <Text style={styles.verifiedByText}>Verified by</Text>
          <Image style={styles.verifierImage} source={images.commonTrustNetworkLogo} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  recordContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 8,
    padding: 16,
  },
  titleText: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 19,
    color: '#255DCB',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  particularContainer: {
    flexDirection: 'row',
    paddingTop: 14,
  },
  rowSpacerMedium: {
    marginLeft: 42,
  },
  fieldTitle: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    color: '#6A6A6C',
  },
  fieldValue: {
    paddingTop: 4,
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 17,
    color: '#484848',
  },
  divider: {
    borderBottomColor: '#C6C6C6',
    borderBottomWidth: 1,
    width: '100%',
    marginTop: 14,
    marginBottom: 14,
  },
  doseDividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
    marginBottom: 7,
  },
  doseDivider: {
    flex: 1,
    height: 1,
    backgroundColor: '#C6C6C6',
    marginTop: 5,
  },
  verifierContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  verifiedByText: {
    paddingTop: 4,
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 17,
    color: '#255DCB',
  },
  verifierImage: {
    marginLeft: 10,
  }
})

export default ResultRecord