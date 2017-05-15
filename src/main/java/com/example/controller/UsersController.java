package com.example.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

/**
 * Created by alejandra on 02/04/17.
 */
@RestController
public class UsersController {

    @RequestMapping(value = "/app/user")
    public Principal user(Principal user) {
        return user;
    }
    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public ResponseEntity<?> logout(Principal user) {
        return new ResponseEntity<Object>(HttpStatus.ACCEPTED);
    }
}
