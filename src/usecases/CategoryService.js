import CategoryRepositoryImpl from "../infrastructure/repositories/CategoryRepository";

export default class CategoryService {

  constructor() {
    this.categoryRepository = new CategoryRepositoryImpl();
  }

  async layCategory() {
    return await this.categoryRepository.getAllCategories();
  }

  async getAllCategories() {
    return await this.categoryRepository.getAllCategories();
  }

  async getCategoryById(id) {
    return await this.categoryRepository.getCategoryById(id);
  }

  async createCategory(category) {
    return await this.categoryRepository.createCategory(category.nameCategory, category.description);
  }

  async updateCategory(id, category) {
    return await this.categoryRepository.updateCategory(id, category.nameCategory, category.description);
  }

  async deleteCategory(id) {
    return await this.categoryRepository.deleteCategory(id);
  }

  async getTotalCategories() {
    return await this.categoryRepository.getTotalCategories();
  }
}
