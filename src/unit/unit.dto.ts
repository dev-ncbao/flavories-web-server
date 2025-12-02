import { Unit } from './unit.model';

export class UnitDto {
    id?: number;
    name?: string;
    abbreviation?: string;

    static fromModel(model: Unit): UnitDto {
        return {
            id: model.getId(),
            name: model.getName(),
            abbreviation: model.getAbbreviation()
        };
    }
}
