import React from 'react';

import {storesContext} from '../contexts';

const useStores = () => React.useContext(storesContext);

export default useStores;
