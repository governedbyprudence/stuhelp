from rest_framework import serializers
from .models import feed_back

class feedback_serializer(serializers.ModelSerializer):

    class Meta:
        model = feed_back
        fields = "__all__"