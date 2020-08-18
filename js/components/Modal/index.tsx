import React from 'react';
import {Modal as RNModal, StyleSheet, View, Button} from 'react-native';

import {COLORS} from '../../consts/colors';

type ModalProps = {
  visible: boolean;
  children: JSX.Element;
  onClose: (e?: Event) => void;
};

const Modal = ({children, onClose, visible}: ModalProps) => {
  return (
    <RNModal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.wrap}>
          {children}
          <View style={styles.buttonWrap}>
            <Button title="Close" onPress={onClose} />
          </View>
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  wrap: {
    flex: 1,
    backgroundColor: COLORS.semiTransparentBackground,
    borderRadius: 15,

    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,

    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonWrap: {
    marginTop: 20,
  },
});

export default Modal;
