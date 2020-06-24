import { Skill } from './skill.model';

export class Character {
  public id: number;
  public nome: string;
  public userId: number;
  public raceId: number;
  public divinityId: number;
  public indoleId: number;
  public provenanceId: number;
  public focusId: number;
  public playedDays: number;
  public background: string;
  public approvationStatus: number;
  public characterApprovationStatus: number;
  public skillsApprovationStatus: number;
  public playerNotes: string;
  public masterNotes: string;
  public baseExperiencePoints: number;
  public experiencePoints: number;
  public usedPoints: number;
  public selectedSkills: Skill[];
  public active: boolean;
  public obbiettiviBt: string;
  public obbiettiviLt: string;
  public money: number;
}
