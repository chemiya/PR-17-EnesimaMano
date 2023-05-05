package com.uva.auth.security.services;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import com.uva.auth.models.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserDetailsImpl implements UserDetails {
  private static final long serialVersionUID = 1L;

  private int id;

  private String nombre;

  private String email;

  @JsonIgnore
  private String password;



  public UserDetailsImpl(int id, String nombre, String email, String password
) {
    this.id = id;
    this.nombre=nombre;
    this.email = email;
    this.password = password;
    
  }

  public static UserDetailsImpl build(User user) {
    

    return new UserDetailsImpl(
        user.getId(), 
        user.getNombre(), 
        user.getEmail(),
        user.getPassword());
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return null;
  }

  public int getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }

 

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return null;
  }


  public String getNombre() {
    return nombre;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    UserDetailsImpl user = (UserDetailsImpl) o;
    return Objects.equals(id, user.id);
  }
}
