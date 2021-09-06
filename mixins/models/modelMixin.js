const modelMixin = {
  methods: {
    setModel(properties, data) {
      return Object.assign({...properties}, data);
    },
    setModels(properties, data) {
      let models = [];
      
      if (!Array.isArray(data)) {
        data = [data];
      }
      data.forEach(modelData => {
        models.push(this.setModel(properties, modelData));
      });
      
      return models;
    }
  }
};

export default modelMixin;
