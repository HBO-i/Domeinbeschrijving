import {Repository, RequestMethod} from 'b302-frontend-library';
import {
    DescriptionIndexRequest,
    DescriptionIndexResponse,
    FilterOptionsResponse,
    ProfessionSkillIndexResponse
} from '../Types';

class FilterRepository extends Repository {

    constructor() {
        super('/filters');
    }

    getOptions() {
        return this.request<FilterOptionsResponse>(this.url(), RequestMethod.GET).send();
    }

    getDescriptions(request: DescriptionIndexRequest) {
        return this.requestWithOptions<DescriptionIndexResponse>('/descriptions', RequestMethod.GET, {
            params: {...request}
        }).sendRaw();
    }

    getProfessionSkills() {
        return this.request<ProfessionSkillIndexResponse>('/professional-skills', RequestMethod.GET).send();
    }
}

export default FilterRepository;
