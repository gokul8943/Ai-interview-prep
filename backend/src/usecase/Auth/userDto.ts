export interface UserDto {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    isVerified: boolean;
    profilePicture?: string;
    createdAt?: Date;
}

export const toUserDto = (user: any): UserDto => {
    const dto: UserDto = {
        _id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role || "user",
        isVerified: Boolean(user.isVerified),
    };
    if (user.phone) dto.phone = user.phone;
    if (user.profilePicture) dto.profilePicture = user.profilePicture;
    if (user.createdAt) dto.createdAt = user.createdAt;
    return dto;
};
