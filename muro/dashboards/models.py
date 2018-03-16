from django.db import models


class Brick(models.Model):
    name = models.CharField(max_length=128)
    color = models.CharField(blank=True, null=True, max_length=128)
    iframe = models.URLField(blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)
    # TODO: image (upload)
    # TODO: embed

    def __str__(self):
        return self.name


class Dashboard(models.Model):
    title = models.CharField(max_length=128)
    fromtime = models.TimeField(blank=True, null=True)
    totime = models.TimeField(blank=True, null=True)

    def __str__(self):
        return self.title


class BrickLocation(models.Model):
    row_id = models.IntegerField()
    col_id = models.IntegerField()
    dashboard = models.ForeignKey(Dashboard, on_delete=models.CASCADE)
    brick = models.ForeignKey(Brick, on_delete=models.CASCADE)


class Muro(models.Model):
    title = models.CharField(max_length=128)
    slug = models.SlugField()
    dashboards = models.ManyToManyField(Dashboard)

    # TODO: duration

    def __str__(self):
        return self.title

    def to_json(self):
        """
        Ugly script to convert models to proper format JSON.
        :return:
        """
        json = {
            "dashboards": []
        }

        for db in self.dashboards.all():
            dashboard = {
                "id": db.id, "rows": [],
                "fromtime": db.fromtime, "totime": db.totime,
            }
            json["dashboards"].append(dashboard)
            # Loop through the locations and see if rows and cols already exist, starting with rows.
            for bl in db.bricklocation_set.all():
                row = {}
                # Check if the row already exists
                for r in dashboard["rows"]:
                    if bl.row_id == r["id"]:
                        row = r
                        break
                # If not, create it and add it.
                if row == {}:
                    row["id"] = bl.row_id
                    row["cols"] = []
                    dashboard["rows"].append(row)

                col = {}
                # Check if the col already exists in this row
                for c in row["cols"]:
                    if bl.col_id == c["id"]:
                        col = c
                        break
                # If not, create it and add it.
                if col == {}:
                    col["id"] = bl.col_id
                    col["bricks"] = []
                    row["cols"].append(col)

                brick = {}
                # Create and add brick and add it
                if bl.brick.iframe:
                    brick["iframe"] = bl.brick.iframe
                if bl.brick.color:
                    brick["color"] = bl.brick.color
                if bl.brick.image_url:
                    brick["image"] = bl.brick.image_url
                col["bricks"].append(brick)
        return json

