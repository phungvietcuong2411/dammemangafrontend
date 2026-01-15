import FollowRepositoryImpl from "../infrastructure/repositories/FollowRepository";

export default class FollowService {

    constructor() {
        this.followRepository = new FollowRepositoryImpl();
    }

    async getFollowsByUser(userId) {
        return await this.followRepository.getFollowsByUser(userId);
    }

    async createFollow(userId, mangaId) {
        return await this.followRepository.createFollow(userId, mangaId);
    }

    async deleteFollow(id) {
        return await this.followRepository.deleteFollow(id);
    }

    async getTopMangaFollowed() {
        return await this.followRepository.getTopMangaFollowed();
    }
}
