package com.uva.auth.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.uva.auth.models.User;
import com.uva.auth.payload.request.LoginRequest;
import com.uva.auth.payload.request.SignupRequest;
import com.uva.auth.payload.response.JwtResponse;
import com.uva.auth.payload.response.MessageResponse;

import com.uva.auth.repository.UserRepository;
import com.uva.auth.security.jwt.JwtUtils;
import com.uva.auth.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;



  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  //me llega peticion de login
  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);
    
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal(); 
    
    

        //devuelve una respuesta
    return ResponseEntity.ok(new JwtResponse(jwt, 
                         userDetails.getId(), 
                         userDetails.getNombre(), 
                         userDetails.getEmail()));
  }


  //me llega peticion de registro
  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
 
    User user = new User(signUpRequest.getNombre(), 
               signUpRequest.getEmail(),
               encoder.encode(signUpRequest.getPassword()));

    
   

    
     
    

    

user.setFoto("-1");
user.setUbicacion("-1");
    
    userRepository.save(user);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }
}
