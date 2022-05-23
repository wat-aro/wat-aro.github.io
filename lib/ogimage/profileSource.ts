import { readFileSync } from 'fs';

const profileImage = readFileSync(
  `${process.cwd()}/public/images/profile.jpg`
).toString('base64');
export const profileSource = `data:image/jpeg;base64, ${profileImage}`;
