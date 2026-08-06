package com.cdac.itregister.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaController {

    @RequestMapping({
            "/dashboard",
            "/letters",
            "/letters/add",
            "/reports",
            "/profile",
            "/departments",
            "/setup"
    })
    public String forward() {
        return "forward:/index.html";
    }

}