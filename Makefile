PROXY_FIX= --network=host \
    --build-arg http_proxy=$(http_proxy) \
    --build-arg no_proxy=crc9

.PHONY: build run login

build:
	docker build \
	  --tag muro \
	  $(PROXY_FIX) \
	  .

define DOCKER_RUN
	docker run \
	  -ti --rm \
	  --name muro \
	  -p 8000:8000 \
	  -v data:/usr/data \
	  muro
endef

run: build
	$(DOCKER_RUN)

login: build
	$(DOCKER_RUN) bash
