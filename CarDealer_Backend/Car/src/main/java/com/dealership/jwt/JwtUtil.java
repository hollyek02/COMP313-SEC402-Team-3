package com.dealership.jwt;



import io.jsonwebtoken.Claims;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.dealership.model.Admin;
//import rubiya.oauth2.repository.RefreshTokenRepository;

import java.security.Key;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Function;

@Component
public class JwtUtil {

	@Value("${security.jwt.secret-key}")
    private String SECRET;

	  private Key getSigningKey() {
	        return Keys.hmacShaKeyFor(SECRET.getBytes());
	    }

	    // ---------- Access Token Methods ----------

	    public String extractEmail(String token) {
	        return extractClaim(token, Claims::getSubject);
	    }

	    public Date extractExpiration(String token) {
	        return extractClaim(token, Claims::getExpiration);
	    }

	    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
	        Claims claims = extractAllClaims(token);
	        return claimsResolver.apply(claims);
	    }

	    private Claims extractAllClaims(String token) {
	        return Jwts.parser()
	                .setSigningKey(getSigningKey())
	                .build()
	                .parseClaimsJws(token)
	                .getBody();
	    }

	    private Boolean isTokenExpired(String token) {
	        return extractExpiration(token).before(new Date());
	    }

	    public Boolean validateToken(String token, String email) {
	        final String extractedEmail = extractEmail(token);
	        return (extractedEmail.equals(email) && !isTokenExpired(token));
	    }
	    
	    //new validate access token
	    public String validateAccessToken(String token) {
	    	
	    	
	    	
	    	try {
	    	    Claims claims = extractAllClaims(token);
	    	    if (claims.getExpiration().before(new Date())) {
	    	        throw new ExpiredJwtException(null, claims, "Token expired");
	    	    }
	    	    return claims.getSubject();
	    	} catch (ExpiredJwtException e) {
	    	    throw new RuntimeException("Access token expired");
	    	} catch (JwtException e) {
	    	    throw new RuntimeException("Invalid access token");
	    	}

	        
	    }
	    
	    


	    public String generateAccessToken(String email) {
	        return Jwts.builder()
	                .setSubject(email)
	                .setIssuedAt(new Date())
	                .setExpiration(new Date(System.currentTimeMillis() + 5* 60 * 1000)) // 1 min
	                .signWith(getSigningKey())
	                .compact();
	    }
	    
	    
	  

	    public ResponseCookie createAccessTokenCookie(String token) {
	        return ResponseCookie.from("access_token", token)
	                .httpOnly(true)
	                .secure(false)
	                .path("/")
	                .maxAge(60 * 10)
	                .sameSite("None")
	                .build();
	    }


}