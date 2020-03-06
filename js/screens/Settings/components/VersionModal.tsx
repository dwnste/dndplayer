import React from 'react';
import {Text, Button, Linking, View, StyleSheet} from 'react-native';

import Modal from '../../../components/Modal';

import {formatDateString} from '../../../utils/date';

type VersionModalProps = {
  description: string;
  downloadLink: string;
  version: string;
  publishedAt: string;
  visible: boolean;
  onClose: (e?: Event) => void;
};

const VersionModal = ({
  visible,
  onClose,
  version,
  downloadLink,
  description,
  publishedAt,
}: VersionModalProps) => {
  const openUrl = () => {
    Linking.openURL(downloadLink);
  };

  const dateString = formatDateString(publishedAt);

  return (
    <Modal visible={visible} onClose={onClose}>
      <View style={styles.wrap}>
        <View style={styles.section}>
          <Text style={styles.text}>Latest version available:</Text>
          <Text style={[styles.text, styles.versionNumber]}>{version}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Description: </Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.dateWrap}>
          <Text style={styles.date}>{dateString}</Text>
        </View>
        <View style={styles.buttonWrap}>
          <Button title="Download" onPress={openUrl} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  text: {
    fontSize: 20,
  },
  date: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 17,
    textAlign: 'right',
  },
  dateWrap: {
    marginTop: 10,
  },
  versionNumber: {
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
    fontSize: 17,
  },
  section: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  buttonWrap: {
    marginTop: 20,
  },
});

export default VersionModal;
