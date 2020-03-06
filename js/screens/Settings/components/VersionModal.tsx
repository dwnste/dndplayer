import React from 'react';
import {Text, Button, Linking, View, StyleSheet} from 'react-native';

import Modal from '../../../components/Modal';

type VersionModalProps = {
  description: string;
  downloadLink: string;
  version: string;
  visible: boolean;
  onClose: (e?: Event) => void;
};

const VersionModal = ({
  visible,
  onClose,
  version,
  downloadLink,
  description,
}: VersionModalProps) => {
  const openUrl = () => {
    Linking.openURL(downloadLink);
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <View style={styles.wrap}>
        <View style={styles.section}>
          <Text style={styles.text}>Latest version available:</Text>
          <Text style={[styles.text, styles.versionNumber]}>{version}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Description: </Text>
          <Text style={styles.text}>{description}</Text>
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
  versionNumber: {
    fontWeight: 'bold',
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
