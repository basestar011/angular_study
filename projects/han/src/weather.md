1. 기능 구성
 - 도시 검색
 - 도시 날씨 조회
 - 온도 변환(섭씨, 화씨)

2. 페이지 구성 및 url 정의
[페이지 구성]
 - 사이트 공통
    1) Header
        - 사이트 타이틀 LOGO 메인페이지 링크 버튼
            url : /weather
        - 도시 검색 Search Box 와 검색 버튼
            url : /search

 - 메인 페이지 및 도시 날씨 노출 페이지
    1) url : /weather & /weather
    2) 구성
        - 검색하지 않았을 때는 이하 목록들 노출 되지 않고 검색한 도시가 없다는 문구 노출.
        - 검색한 도시의 날씨 노출 부분 : 도시 이름, 검색 시간, 날씨 상태 이미지/텍스트, 평균/최고/최저 기온
        - 기온 변환 버튼

 - 도시 검색 페이지
    1) url : /search & /search/$city
    2) 구성
        - 도시를 검색하는 Search Box 와 검색 버튼
        - 검색한 도시 리스트가 노출되는 부분

3. package 구조
    /src
        /core
            /services
                - weather.service.ts : 날씨 조회 서비스
                - city.service.ts : 도시 관련 서비스
                - temperature.service.ts : 온도 변환 서비스
                - api.service.ts : 공통 weather api 서비스
            /models
                - Weather.ts : 날씨 정보 저장 모델
            /enums
                - WeatherCondition.ts : 날씨 상태 별 텍스트 Enum
        /weather : 메인 날씨 조회 페이지
            - weather.component.ts : 날씨 페이지 컴포넌트
            - weather.module.ts : 날씨 페이지 모듈
            /weather-Info
                - weather-Info.component.ts : 날씨 정보 컴포넌트
        /searchcity : 도시 검색 페이지
            - searchcity.component.ts : 도시 검색 페이지 컴포넌트
            - searchcity.module.ts : 도시 검색 페이지 모듈
            - searchcity-routing.module.ts : 도시 검색 페이지 라우팅 모듈
            /citylist
                - citylist.component : 검색된 도시 리스트 컴포넌트
            
        /shared
            - shared.module.ts : 공통 공유 모듈
            /buttons
                - search-button.component : 검색 이미지가 있는 버튼