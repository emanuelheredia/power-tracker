import sha1 from "sha1";
import axios from "axios";

const useCloudinary = () => {
	const formData = new FormData();
	const handleDrop = async (
		files,
		setImageData,
		setErroUpload,
		setLoading,
	) => {
		const uploaders = files.map((file) => {
			setLoading(true);
			formData.append("file", file);
			formData.append("tags", `codeinfuse, medium, gist`);
			formData.append("upload_preset", "power-track");
			formData.append("api_key", "554344367518936");
			formData.append("timestamp", Date.now() / 1000) | 0;
			return axios
				.post(
					"https://api.cloudinary.com/v1_1/daxahjyc9/image/upload",
					formData,
					{
						headers: {
							"X-Requested-With": "XMLHttpRequest",
						},
					},
				)
				.then((response) => {
					const data = response.data;
					const public_id = data.public_id;
					const fileURL = data.secure_url;
					setImageData({ fileURL, public_id });
				})
				.catch(() => {
					setErroUpload(true);
					setLoading(false);
				});
		});
		axios.all(uploaders).then(() => {
			setLoading(false);
		});
	};
	const handleDelete = async (id) => {
		const timestamp = new Date().getTime();
		const string = `public_id=${id}&timestamp=${timestamp}A00Golz5STHgRO2aGF4xbN3k17o`;
		const signature = await sha1(string);
		formData.append("public_id", id);
		formData.append("signature", signature);
		formData.append("upload_preset", "power-track");
		formData.append("api_key", "554344367518936");
		formData.append("timestamp", timestamp);
		return axios
			.post(
				"https://api.cloudinary.com/v1_1/daxahjyc9/image/destroy",
				formData,
				{ headers: { "X-Requested-With": "XMLHttpRequest" } },
			)
			.then((response) => {
				const data = response.data;
			})
			.catch((error) => console.log(error));
	};
	return { handleDrop, handleDelete };
};

export default useCloudinary;
