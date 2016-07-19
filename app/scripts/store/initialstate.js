export default {
  isMainMenuOpen: false,
  auth: {
    state: 'anonymous',
    user: null
  },
  characters: {
    state: 'uninitialized',
    values: null
  },
  dialogues: {
    state: 'uninitialized',
    values: {}
  },
  maps: {
    state: 'uninitialized',
    editingMode: 'obstructions',
    values: {}
  }
};
