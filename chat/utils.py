from functools import wraps
from django.shortcuts import redirect
from django.urls import reverse


# entrance 페이지로 리다이렉트 시키는 decorator
def nickname_required(f):
    @wraps(f)
    def set_nickname(request, *args, **kwargs):
        if not 'nickname' in request.POST:
            return redirect(f"{reverse('chat:entrance')}?next={request.path}")
        return f(request, *args, **kwargs)
    return set_nickname
