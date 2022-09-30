package com.aliyun.dingtalk.controller;

import com.aliyun.dingtalk.service.DingTalkUserService;
import com.aliyun.dingtalk.model.ServiceResult;
import com.dingtalk.api.response.OapiV2UserGetResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


/**
 * 钉钉h5企业内部应用DEMO, 实现了根据用户授权码获取用户信息功能
 */
@RestController
public class DingTalkUserController {

    @Autowired
    private DingTalkUserService dingTalkUserService;

    /**
     * 欢迎页面, 检查后端服务是否启动
     *
     * @return
     */
    @GetMapping("/welcome")
    public String welcome() {
        return "welcome";
    }

    /**
     * 根据免登授权码, 获取登录用户身份
     *
     * @param authCode 免登授权码
     * @return
     */
    @GetMapping("/login")
    public ServiceResult login(@RequestParam(value = "authCode") String authCode) {
        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhcHAiOiJnb3YiLCJjbGllbnQiOiJ3ZWIiLCJleHAiOjE2NjUwMzc2NTQsInVzZXJJZCI6IjczYWU2MjgwZTQ2YTY2NTNhNTYwNWQ1MWQ1NDYyNzI1IiwiaWF0IjoxNjY0NDMyODU0fQ.Kls26A6w7lyWg1_c95rvMo15qtnADdslaEQQgWPOaByJBVQkUPSDP7wQOSDSMoz1Felzps_hjaTDYZ_lKIplzQ";
        OapiV2UserGetResponse.UserGetResponse userInfo = dingTalkUserService.getUserInfo(authCode);
        userInfo.setExtension(token);
        return ServiceResult.getSuccessResult(userInfo);

    }
}
