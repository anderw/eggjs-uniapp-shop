let cloudPlatforms = {
    "aliyun": {
        "name": "阿里云" ,//阿里云
        "status": true,
        "distribution": true,
        "code": "aliyun",
        "logoClass": "cloud-platform-aliyun",
        "labelKey":"Access Key ID",
        "labelSecret": "Access Key Secret"
    },
    "tencent": {
        "name": "腾讯云",
        "status": true,
        "distribution": false,
        "code": "tencent",
        "logoClass": "cloud-platform-tencent",
        "labelKey":"SecretId",
        "labelSecret": "SecretKey"
    },
    "huawei": {
        "name": "华为云",
        "status": false,
        "distribution": false,
        "code": "huawei",
        "logoClass": "cloud-platform-huawei",
        "labelKey":"Access Key ID",
        "labelSecret": "Access Key Secret"
    },
    "azure": {
        "name": "Azure中国",
        "status": false,
        "distribution": false,
        "code": "azure",
        "logoClass": "cloud-platform-azure",
        "labelKey":"Client ID",
        "labelSecret": "Client Secret"
    },
    "aws": {
        "name": "AWS",
        "status": true,
        "distribution": false,
        "code": "aws",
        "logoClass": "cloud-platform-aws",
        "labelKey":"Access Key ID",
        "labelSecret": "Access Key Secret"
    },
    "ctyun": {
        "name": "天翼云",
        "status": true,
        "distribution": false,
        "code": "ctyun",
        "logoClass": "cloud-platform-ctyun",
        "labelKey":"Access Key ID",
        "labelSecret": "Access Key Secret"
    },
}
export const cloudPlatform = cloudPlatforms;

export const defaultData = {
    "instanceChargeType": {
        "aliyun": "PostPaid",
        "tencent": "POSTPAID_BY_HOUR",
        "huawei": "postPaid"
    },
    "internetChargeType": {
        "aliyun": "PayByTraffic",
        "tencent": "TRAFFIC",
        "huawei": "traffic"
    },
    "systemDiskCategory": {
        "aliyun": "cloud_efficiency",
        "tencent": "CLOUD_PREMIUM",
        "huawei": "SATA",
        "ctyun": "SATA",
        "aws": "gp2"
    },
    "diskTypes": {
        "tencent": {
            "CLOUD_SSD": { "diskType": "CLOUD_SSD", "min": 100, "max": 16000 },
            "CLOUD_PREMIUM": { "diskType": "CLOUD_PREMIUM", "min": 10, "max": 16000 }
        },
        "aliyun": {
            // "cloud": { "diskType": "cloud", "min": 5, "max": 2000 },
            "cloud_efficiency": { "diskType": "cloud_efficiency", "min": 20, "max": 32768 },
            "cloud_ssd": { "diskType": "cloud_ssd", "min": 20, "max": 32768 },
            // "cloud_essd": { "diskType": "cloud_essd", "min": 20, "max": 32768 }
        },
        "huawei": {
            "SATA": { "diskType": "SATA", "min": 40, "max": 1024 },
            "SAS": { "diskType": "SAS", "min": 40, "max": 1024 },
            "SSD": { "diskType": "SSD", "min": 40, "max": 1024 },
        },
        "ctyun": {
            "SATA": { "diskType": "SATA", "min": 10, "max": 32768 },
            "SAS": { "diskType": "SAS", "min": 10, "max": 32768 },
            "SSD": { "diskType": "SSD", "min": 10, "max": 32768 },
        },
		"aws": {
		    "gp2": { "diskType": "gp2", "min": 1, "max": 16384 },
		    "io1": { "diskType": "io1", "min": 4, "max": 16384 },
		    "st1": { "diskType": "st1", "min": 500, "max": 16384 },
			"sc1": { "diskType": "sc1", "min": 500, "max": 16384 },
			"standard":{ "diskType": "standard", "min": 1, "max": 1024 },
		},
    },
    "dataDiskTypes":{
        "tencent": {
            "CLOUD_SSD": { "diskType": "CLOUD_SSD", "min": 100, "max": 16000 },
            "CLOUD_PREMIUM": { "diskType": "CLOUD_PREMIUM", "min": 10, "max": 16000 }
        },
        "aliyun": {
            // "cloud": { "diskType": "cloud", "min": 5, "max": 2000 },
            "cloud_efficiency": { "diskType": "cloud_efficiency", "min": 20, "max": 32768 },
            "cloud_ssd": { "diskType": "cloud_ssd", "min": 20, "max": 32768 },
            // "cloud_essd": { "diskType": "cloud_essd", "min": 20, "max": 32768 }
        },
        "huawei": {
            "SATA": { "diskType": "SATA", "min": 10, "max": 32768 },
            "SAS": { "diskType": "SAS", "min": 10, "max": 32768 },
            "SSD": { "diskType": "SSD", "min": 10, "max": 32768 },
        },
		"ctyun": {
			"SATA": { "diskType": "SATA", "min": 10, "max": 32768 },
			"SAS": { "diskType": "SAS", "min": 10, "max": 32768 },
			"SSD": { "diskType": "SSD", "min": 10, "max": 32768 },
		},
		"aws": {
		    "gp2": { "diskType": "gp2", "min": 1, "max": 16384 },
		    "io1": { "diskType": "io1", "min": 4, "max": 16384 },
		    "st1": { "diskType": "st1", "min": 500, "max": 16384 },
			"sc1": { "diskType": "sc1", "min": 500, "max": 16384 },
			"standard":{ "diskType": "standard", "min": 1, "max": 1024 },
		},
    }
}

export const defaultRuleList=[
    {id: 1,cidr: "0.0.0.0/0",direction: "ingress",policy: "1",portEnd: "80",portStart: "80",protocol: "tcp"},
    {id: 2,cidr: "0.0.0.0/0",direction: "ingress",policy: "1",portEnd: "443",portStart: "443",protocol: "tcp"},
    {id: 3,cidr: "0.0.0.0/0",direction: "ingress",policy: "1",portEnd: "22",portStart: "22",protocol: "tcp"},
    {id: 4,cidr: "0.0.0.0/0",direction: "ingress",policy: "1",portEnd: "-1",portStart: "-1",protocol: "icmp"},
    // {id: 5,cidr: "0.0.0.0/0",direction: "egress",policy: "1",portEnd: "-1",portStart: "-1",protocol: "all"},
    {id: 6,cidr: "0.0.0.0/0",direction: "egress",policy: "1",portEnd: "65535",portStart: "1",protocol: "tcp"}
]

export const InvoiceEntryPlatformInfo = {
    "aliyun": {
        "invoiceTitle": '阿里云计算有限公司',  //发票抬头 ,
        "registerNo": '91330106673959654P',  //公司税号 ,
        "bank": '招商银行杭州高新支行',  //公司税号 ,
        "bankNo": '5719 0549 3610 702',  //公司税号 ,
        "operatingLicenseAddress": '杭州市转塘科技经济区块16号8幢',  //注册地址 ,
        "operatingLicensePhone": '0571-85022088',  //电话 ,
        "recipientAddress":"浙江省杭州江干区东宁路553号东溪德必易园C区二层C282", //发票接收地址 ,
        "recipientName":"阿里巴巴集团-财务结算组",// 收件人姓名 ,
        "recipientPhone":"0571-26883163",// 收件人电话
    },
    "tencent": {},
    "huawei": {},
    "aws": {},
}