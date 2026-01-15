import MangaCategoryRepositoryImpl from "../infrastructure/repositories/MangaCategoryRepository";

export default class MangaCategoryService {

    constructor() {
        this.categoryRepository = new MangaCategoryRepositoryImpl();
    }

    async getAllCategoryManga() {
        return await this.categoryRepository.getAllCategoryManga();
    }

    async getCategoryById(id) {
        return await this.categoryRepository.getCategoryById(id);
    }

    async createCategory(category) {
        // category = { idManga, idCategory }
        return await this.categoryRepository.createCategory(
            category.idManga,
            category.idCategory
        );
    }

    async updateCategory(id, category) {
        // category = { idManga, idCategory }
        return await this.categoryRepository.updateCategory(
            id,
            category.idManga,
            category.idCategory
        );
    }

    async deleteCategory(id) {
        return await this.categoryRepository.deleteCategory(id);
    }


    async updateCategoriesToManga(idManga, categoryIds) {
        return await this.categoryRepository.updateCategoriesToManga(idManga, categoryIds);
    }

    async getCategoriesByManga(idManga) {
        return await this.categoryRepository.getCategoriesByManga(idManga);
    }

}
