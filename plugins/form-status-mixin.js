import {
  FORM_STATUS_ERROR,
  FORM_STATUS_SUCCESS,
  FORM_STATUS_WORKING
} from '~/plugins/form-statuses';

export const formStatusMixin = {
  data() {
    return {
      formStatus: '',
      formStatuses: {
        FORM_STATUS_WORKING,
        FORM_STATUS_SUCCESS,
        FORM_STATUS_ERROR
      }
    };
  },
  methods: {
    formStatusIs: status => this.formStatus === status
  }
}
;
