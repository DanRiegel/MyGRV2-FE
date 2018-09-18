import { CharacterDtoPipe } from './character-dto.pipe';

describe('CharacterDtoPipe', () => {
  it('create an instance', () => {
    const pipe = new CharacterDtoPipe();
    expect(pipe).toBeTruthy();
  });
});
