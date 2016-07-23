export const Actions = {
  // Auth
  Login: 'login',
  Logout: 'logout',
  AttemptingLogin: 'attemptingLogin',
  AttemptingLogout: 'attemptingLogout',
  FetchingUser: 'fetchingUser',

  // Main Menu
  CloseMainMenu: 'closeMainMenu',
  OpenMainMenu: 'openMainMenu',

  // Characters
  FetchingCharacters: 'fetchingCharacters',
  ReceiveCharacters: 'receiveCharacters',
  StartCreatingNewCharacter: 'startCreatingNewCharacter',
  DiscardNewCharacter: 'discardNewCharacter',
  SavingNewCharacter: 'savingNewCharacter',
  NewCharacterSaved: 'newCharacterSaved',
  DeletingCharacter: 'deletingCharacter',
  CharacterDeleted: 'characterDeleted',

  // Dialogues
  FetchingDialogues: 'fetchingDialogues',
  ReceiveDialogues: 'receiveDialogues',
  NewDialogueSaved: 'newDialogueSaved',
  SavingNewDialogue: 'savingNewDialogue',
  StartCreatingNewDialogue: 'startCreatingNewDialogue',
  DiscardNewDialogue: 'discardNewDialogue',
  FetchingDialogue: 'fetchingDialogue',
  ReceiveDialogue: 'receiveDialogue',

  // Maps
  FetchingMaps: 'fetchingMaps',
  ReceiveMaps: 'receiveMaps',
  NewMapSaved: 'newMapSaved',
  SavingNewMap: 'savingNewMap',
  StartCreatingNewMap: 'startCreatingNewMap',
  DiscardNewMap: 'discardNewMap',
  FetchingMap: 'fetchingMap',
  ReceiveMap: 'receiveMap',
  AddingObstruction: 'addingObstruction',
  RemovingObstruction: 'removingObstruction',
  ObstructionAdded: 'obstructionAdded',
  ObstructionRemoved: 'obstructionRemoved',
  ChangeEditingMode: 'changeEditingMode',

  // Maps - spawn points
  StartCreatingNewSpawnPoint: 'startCreatingNewSpawnPoint',
  CancelCreatingNewSpawnPoint: 'cancelCreatingNewSpawnPoint',
  SavingNewSpawnPoint: 'savingNewSpawnPoint',
  SpawnPointSaved: 'spawnPointSaved',
  RemovingSpawnPoint: 'removingSpawnPoint',
  SpawnPointRemoved: 'spawnPointRemoved',

  // Maps - trigger tiles
  StartCreatingNewTriggerTile: 'startCreatingNewtriggerTile',
  CancelCreatingNewTriggerTile: 'cancelCreatingNewTriggerTile',
  StartEditingTriggerTile: 'startEditingTriggerTile',
  SavingNewTriggerTile: 'savingNewTriggerTile',
  TriggerTileSaved: 'triggerTileSaved',
  UpdatingTriggerTile: 'updatingTriggerTile',
  TriggerTileUpdated: 'triggerTileUpdated',
  CancelEditingTriggerTile: 'cancelEditingTriggerTile'
};
