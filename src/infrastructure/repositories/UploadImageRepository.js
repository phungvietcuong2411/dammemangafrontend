import axiosClient from "../http/axiosClient";

export default class UploadImageRepositoryImpl {

    /**
     * Upload ảnh lên backend -> backend upload ImgBB -> trả về link ảnh
     * @param {File} file - file ảnh user chọn
     * @returns {Promise<string>} URL ảnh trực tiếp trả từ ImgBB
     */
    async uploadImage(file) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axiosClient.post("/upload/imgbb", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    }
}
