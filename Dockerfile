FROM python:3.4

WORKDIR /usr/src/app
COPY requirements.txt ./
COPY requirements/ requirements/
RUN pip install -r requirements.txt
COPY . .

EXPOSE 8000
CMD ["./run_app", "8000"]
