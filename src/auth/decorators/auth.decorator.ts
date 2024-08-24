import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { META_ROLES, UserRoles } from '../interfaces';
import { JwtAuthGuard, UserRoleGuard } from '../guards';

export function Auth(...roles: UserRoles[]) {
    return applyDecorators(
        SetMetadata(META_ROLES, roles),
        UseGuards(JwtAuthGuard, UserRoleGuard),
    );
}