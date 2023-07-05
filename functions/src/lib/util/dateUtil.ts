const convertDate = (fbDate: {
  _seconds: number;
  _nanoseconds: number;
}): Date => {
  const { _seconds, _nanoseconds } = fbDate;
  return new Date(_seconds * 1000 + _nanoseconds / 1000);
};
export { convertDate };
