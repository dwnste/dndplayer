import React from 'react';
import {
  Modal as RNModal,
  StyleSheet,
  ScrollView,
  View,
  Button,
} from 'react-native';

type ModalProps = {
  visible: boolean;
  children: JSX.Element;
  onClose: (e: Event) => void;
};

const Modal = ({children, onClose, visible}: ModalProps) => {
  return (
    <RNModal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.wrap}>
          <ScrollView>{children || null}</ScrollView>
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
    backgroundColor: 'rgba(0, 0, 0, 0.20)',
  },
  wrap: {
    flex: 1,
    backgroundColor: '#fff',
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
