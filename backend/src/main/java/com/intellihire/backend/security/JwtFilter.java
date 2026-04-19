package com.intellihire.backend.security;

import com.intellihire.backend.util.JwtUtil;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Override
protected void doFilterInternal(HttpServletRequest request,
                                HttpServletResponse response,
                                FilterChain filterChain)
        throws ServletException, IOException {

    
    String path = request.getRequestURI();

    System.out.println("Request Path: " + path);

    // ✅ SKIP JWT for public APIs
    if (path.startsWith("/api/auth") ||
        path.startsWith("/api/resume") ||
        path.startsWith("/api/interview") ||
        path.startsWith("/api/evaluate") ||
        path.startsWith("/api/analytics")) {

        filterChain.doFilter(request, response);
        return;
    }

    String authHeader = request.getHeader("Authorization");

if (authHeader == null || !authHeader.startsWith("Bearer ")) {
    filterChain.doFilter(request, response); // ✅ allow request
    return;
}

    String token = authHeader.substring(7);

if (!jwtUtil.validateToken(token)) {
    filterChain.doFilter(request, response); // ✅ don't block
    return;
}

    filterChain.doFilter(request, response);
}
}