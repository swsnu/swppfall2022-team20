def analyze(clothes_size, user_size):
    analysis = "length is {}, waist is {}, thigh is {}. calf is {}."
    def analyze_length(clothes_length, user_length):
        diff = user_length - clothes_length
        if diff <= 0:
            return "toolong"
        elif diff <= 3.0:
            return "dirty"
        elif diff <= 7.0:
            return "loose"
        elif diff <= 12.0:
            return "regular"
        else:
            return "crop"

    def analyze_waist(clothes_waist, user_waist):
        diff = clothes_waist - user_waist
        if diff >= 3.0 or diff < -1.0:
            return "tooBigorTight"
        elif diff > 1.0 and diff < 3.0:
            return "big"
        elif diff >= -1.0 and diff <= 1.0:
            return "regular"

    def analyze_thigh(clothes_thigh, user_thigh):
        diff = clothes_thigh - user_thigh
        if not diff >= 1.0:
            return "tooTight"
        elif diff >= 1.0 and diff < 3.0:
            return "skinny"
        elif diff >= 3.0 and diff <= 5.0:
            return "regular"
        elif diff > 5.0 and diff < 7.0:
            return "semi-wide"
        else:
            return "wide"

    def analyze_calf(clothes_calf, user_calf):
        diff = clothes_calf - user_calf
        if not diff >= 1.0:
            return "tooTight"
        elif diff >= 1.0 and diff < 3.0:
            return "skinny"
        elif diff >= 3.0 and diff <= 5.0:
            return "regular"
        elif diff > 5.0 and diff < 7.0:
            return "semi-wide"
        else:
            return "wide"

    waist_analysis = analyze_waist(clothes_size[1], user_size[1])
    if waist_analysis == "tooBigorTight":
        return False
    length_analysis = analyze_length(clothes_size[0], user_size[0])
    if length_analysis == "toolong":
        return False
    thigh_analysis = analyze_thigh(clothes_size[2], user_size[2])
    if thigh_analysis == "tooTight":
        return False
    calf_analysis = analyze_calf(clothes_size[3], user_size[3])
    if calf_analysis == "tooTight":
        return False
    
    return analysis.format(length_analysis, waist_analysis, thigh_analysis, calf_analysis)

print(analyze([100,42,33,20],[107,40,27,17]))
print(analyze([108,42,33,20],[107,40,27,17]))
print(analyze([100,43,33,20],[107,40,27,17]))
print(analyze([100,42,27,20],[107,40,27,17]))