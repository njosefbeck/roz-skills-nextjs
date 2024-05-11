import { expect, test, describe } from 'vitest'
import { getSkillById } from '../app/skills'

describe('Skills', () => {

  test('gets skill by id', () => {
    const result = getSkillById('1');
    expect(result.id).toBe(1);
    expect(result.key).toBe('NV_BASIC');
    expect(result.name).toBe('기본기능');
  });

});
