
export type UserRole = "author" | "subscriber" | "admin" | 'maintainer' | 'editor';

export type UserStatus = "pending" | "active" | "inactive";

export type UserPlan = 'basic' | 'team' | 'company' | 'enterprise';

export interface UserListParams {
    q: string | '';
    role: UserRole | '';
    status: UserStatus | '';
    currentPlan: UserPlan | '';
}

export interface UserList {
    id: number;
    fullName: string;
    company: string;
    role: UserRole;
    username: string;
    contact: string;
    email: string;
    currentPlan: UserPlan;
    status: UserStatus;
    avatar: string | null;
    avatarColor?: string;
}

export interface UserListState {
    data: Partial<Array<UserList>>;
    total: number;
    allData: Partial<Array<UserList>>;
    params: UserListParams;
}