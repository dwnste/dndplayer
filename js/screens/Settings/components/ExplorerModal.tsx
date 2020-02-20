import React from 'react';

import Modal from '../../../components/Modal';
import Explorer from '../../../components/Explorer';

import {ReadDirItem} from 'react-native-fs';

type ExplorerModalProps = {
  items: ReadDirItem[];
  visible: boolean;
  toggle: (e: Event) => void;
  setDir: (item: ReadDirItem) => any;
  openDir: (item: ReadDirItem) => any;
  onPressBack: () => void;
};

const showSelect = (item: ReadDirItem) => item.isDirectory();

const ExplorerModal = ({
  items,
  visible,
  toggle,
  setDir,
  openDir,
  onPressBack,
}: ExplorerModalProps) => (
  <Modal visible={visible} onClose={toggle}>
    <Explorer
      showSelect={showSelect}
      items={items}
      onPress={openDir}
      onSelect={setDir}
      onPressBack={onPressBack}
    />
  </Modal>
);

export default ExplorerModal;
