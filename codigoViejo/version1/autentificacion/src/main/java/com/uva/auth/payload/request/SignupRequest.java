package com.uva.auth.payload.request;

import java.util.Set;

import javax.validation.constraints.*;

public class SignupRequest {
  @NotBlank
  @Size(min = 3, max = 20)
  private String nombre;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  

  @NotBlank
  @Size(min = 6, max = 40)
  private String password;

  public String getNombre() {
    return nombre;
  }

  public void setNombre(String username) {
    this.nombre = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  
}
