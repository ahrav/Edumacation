from rest_framework import permissions


class IsOwnerOrReadyOnly(permissions.BasePermission):
    """Only allow owners of an object can modify it"""

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author.user == request.user
