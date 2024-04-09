import { UserImages } from "@/config/user-images.config"

export const getRandomUserImage = () => {
    const randomIndex = Math.floor(Math.random() * UserImages.length);
    return UserImages[randomIndex];
}