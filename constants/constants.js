export const DISCORD_LINK = "https://discord.gg/24my5DbuS9";
export const PLACEHOLDER_BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMd66vBwADzAGiDaTe+gAAAABJRU5ErkJggg==";
export const ARBITER = "ARBITER";
export const USER = "USER";
export const GUEST = "GUEST";

// Dispute STATES
export const UNINITIALIZED = 0;
export const CREATED = 1;
export const ARBITER_SELECTION = 2;
export const CAN_VOTE = 3;
export const COMPUTE_RESULT = 4;
export const END = 5;

export const DISPUTE_STATE = [
  { value: 0, text: 'Uninitialized' },
  { value: 1, text: 'Created' },
  { value: 2, text: 'Arbiter Selection' },
  { value: 3, text: 'Can Vote' },
  { value: 4, text: 'Compute Result' },
  { value: 5, text: 'End' },
]
// export const DISPUTE_STATE = {
//   UNINITIALIZED: { value: 0, text: 'Uninitialized' },
//   CREATED: { value: 0, text: 'Created' },
//   ARBITER_SELECTION: { value: 0, text: 'Arbiter Selection' },
//   CAN_VOTE: { value: 0, text: 'Can Vote' },
//   COMPUTE_RESULT: { value: 0, text: 'Compute Result' },
//   END: { value: 0, text: 'End' },
// }

// Dispute STAKES
export const STAKE = "0.02";
